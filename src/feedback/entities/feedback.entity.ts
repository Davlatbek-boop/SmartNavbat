import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { Staff } from "../../staff/entities/staff.entity";


@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    client_id: number

    @Column()
    ticket_id: number

    @Column()
    staff_id: number

    @Column()
    raiting: number

    @Column()
    comment: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(()=>Client, (client)=> client.feedback)
    client: Client

    @ManyToOne(()=>Ticket, (ticket)=> ticket.feedback)
    ticket: Ticket

    @ManyToOne(()=> Staff, (staff)=> staff.feedback)
    staff: Staff
}
