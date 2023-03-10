//*HTML references
const lblTicket1 = document.querySelector( '#lblTicket1' );
const lblTicket2 = document.querySelector( '#lblTicket2' );
const lblTicket3 = document.querySelector( '#lblTicket3' );
const lblTicket4 = document.querySelector( '#lblTicket4' );

const lblEscritorio1 = document.querySelector( '#lblEscritorio1' );
const lblEscritorio2 = document.querySelector( '#lblEscritorio2' );
const lblEscritorio3 = document.querySelector( '#lblEscritorio3' );
const lblEscritorio4 = document.querySelector( '#lblEscritorio4' );  

const socket = io();

socket.on( 'actual-state', ( payload ) => {

    const newTicketAudio = new Audio( './audio/new-ticket.mp3' );
    newTicketAudio.play();

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if ( ticket1 ) {
        lblTicket1.innerText     = 'Ticket '     + ticket1.number;
        lblEscritorio1.innerText = 'Escritorio ' + ticket1.desktop;
    }
    if ( ticket1 ) {
        lblTicket2.innerText     = 'Ticket '     + ticket2.number;
        lblEscritorio2.innerText = 'Escritorio ' + ticket2.desktop;
    }
    if ( ticket1 ) {
        lblTicket3.innerText     = 'Ticket '     + ticket3.number;
        lblEscritorio3.innerText = 'Escritorio ' + ticket3.desktop;
    }
    if ( ticket1 ) {
        lblTicket4.innerText     = 'Ticket '     + ticket4.number;
        lblEscritorio4.innerText = 'Escritorio ' + ticket4.desktop;
    }
    
    
})