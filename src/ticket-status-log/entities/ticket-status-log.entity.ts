import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { Staff } from "../../staff/entities/staff.entity";

@Entity()
export class TicketStatusLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticket_id: number;

  @Column()
  staff_id: number;

  @Column()
  old_status: string;

  @Column()
  new_status: string;

  @Column({default: ""})
  notes: string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(()=>Ticket, (ticket)=> ticket.ticketStatusLog)
  ticket: Ticket

  @ManyToOne(()=>Staff, (staff)=> staff.ticketStatusLog)
  staff: Staff
}
