import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './user.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn({
        type: 'tinyint',
    })
    id: number;

    @Column('varchar', {
        length: 10,
        nullable: false,
    })
    type: string;

    @Column('nvarchar', {
        length: 128,
        nullable: false,
    })
    title: string;

    @Column('text', {
        nullable: false,
    })
    content: string;

    @Column('tinyint', {
        width: 3,
        nullable: false,
        default: 0,
    })
    progress: number;

    @ManyToOne(
        type => User,
        user => user.tasks,
        { eager: false },
    )
    @JoinColumn({ name: 'user_id' })
    user: User;
}
