import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class CalledTicket {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ticketId: number

    @Column()
    staffId: number

    @Column()
    counterId: number

    @Column()
    colledAt: Date

    @Column()
    displayedOnScreen: boolean
}
