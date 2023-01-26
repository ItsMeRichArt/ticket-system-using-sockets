
const fs   = require(  'fs'  );
const path = require( 'path' );

class Ticket {

    constructor( number, desktop ) {

        this.number  = number;
        this.desktop = desktop;
    
    }

}

class TicketControl {

    constructor() {

        this.lastTicket      = 0;
        this.todayDate       = new Date().getDate();
        this.tickets         = [];
        this.lastFourTickets = [];

        this.initializeDataBase();

    }

    get toJsonData() {

        return {
            lastTicket      : this.lastTicket,
            todayDate       : this.todayDate,
            tickets         : this.tickets,
            lastFourTickets : this.lastFourTickets
        }
    }

    initializeDataBase() {

        const { todayDate, tickets, lastTicket, lastFourTickets } = require( '../db/data.json' );
        
        if( todayDate === this.todayDate ){

            this.lastTicket      = lastTicket;
            this.tickets         = tickets;
            this.lastFourTickets = lastFourTickets;

        } else {

            this.saveDataBase();

        }

    }

    saveDataBase() {

        const dataBasePath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dataBasePath, JSON.stringify( this.toJsonData ) );

    }

    nextTicket() {

        this.lastTicket += 1;
        const ticket     = new Ticket( this.lastTicket, null );
        this.tickets.push( ticket );
        
        this.saveDataBase();
        return 'Ticket ' + ticket.number;

    }

    attendTicket( desktop ) {

        if( this.tickets.length === 0 ) return null;
        
        const ticket = this.tickets.shift();

        ticket.desktop = desktop;    
        
        this.lastFourTickets.unshift( ticket );

        if( this.lastFourTickets.length > 4 ) {
            this.lastFourTickets.splice( -1, 1 );
        }
        
        this.saveDataBase();

        return ticket;

    }

}

module.exports = TicketControl;