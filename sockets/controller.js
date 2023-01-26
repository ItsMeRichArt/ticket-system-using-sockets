const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = ( socket ) => {
    
    socket.emit( 'last-ticket'    , ticketControl.lastTicket      );
    socket.emit( 'actual-state'   , ticketControl.lastFourTickets );
    socket.emit( 'pending-tickets', ticketControl.tickets.length  );
    
    socket.on('next-ticket', ( payload, callback ) => {
        
        const nextTicket = ticketControl.nextTicket();
        callback( nextTicket );
        
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length  );
        //todo: Notificar que hay un nuevo ticket pendiente por asignar

    })

    socket.on( 'attend-ticket', ( { desktop }, callback ) => {
        
        if ( !desktop ) {

            return callback ({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })

        }

        const ticketToAttend = ticketControl.attendTicket( desktop );

        socket.emit( 'pending-tickets', ticketControl.tickets.length  );
        socket.broadcast.emit( 'actual-state'   , ticketControl.lastFourTickets );
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length  );

        if ( !ticketToAttend ) {

            return callback ({
                ok: false,
                msg: 'Ya no hay tickets por atender'
            })

        } else {

            return callback ({
                ok: true,
                ticketToAttend
            })
            
        }
 
    })

}

module.exports = { socketController }

