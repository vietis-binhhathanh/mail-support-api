import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './user.entity';
import {Project} from './project.entity';

@Entity('mails')
export class Mail {
    @Column('datetime', {
        name: 'joined_date',
        nullable: false,
    })
    joinedDate: Date;

    @Column('varchar', {
        length: 32,
        nullable: false,
    })
    roll: string;

    @Column('datetime', {
        nullable: false,
        name: 'created_date',
    })
    createdDate: Date;

    @Column('datetime', {
        nullable: false,
        name: 'updated_date',
    })
    updatedDate: Date;

    @ManyToOne(
        type => User,
        user => user.mails,
        { eager: false, primary: true },
    )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(
        type => Project,
        project => project.mails,
        { eager: false, primary: true },
    )
    @JoinColumn({ name: 'project_id' })
    project: Project;
}
