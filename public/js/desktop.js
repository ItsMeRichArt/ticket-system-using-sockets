//*HTML references
const lblPendientes    = document.querySelector( '#lblPendientes' );
const lblTicket        = document.querySelector( 'small'  );
const lblEscritorio    = document.querySelector( 'h1'     );
const divAlerta        = document.querySelector( '.alert' );
const btnAtenderTicket = document.querySelector( 'button' );

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has( 'desktop' ) ){

    window.location = 'index.html';
    throw new Error( 'El escritorio es obligatorio' );

}

const desktop = searchParams.get( 'desktop' );
lblEscritorio.innerText = desktop ;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtenderTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnAtenderTicket.disabled = true;
});

socket.on( 'pending-tickets', ( pendingTickets ) => {

    if ( pendingTickets === 0 ){
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendingTickets; 
    }

} )

btnAtenderTicket.addEventListener( 'click', () => {
    
    socket.emit( 'attend-ticket', { desktop }, ({ ok, ticketToAttend, msg }) => {
        
        if ( !ok ) {
            
            lblTicket.innerText = 'nadie actualmente'
            return divAlerta.style.display = '';
            
        }
        
        lblTicket.innerText = 'Ticket ' + ticketToAttend.number;
        
    })
    
    
});
