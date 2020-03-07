import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Mail} from './mail.entity';
import {Task} from './task.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({
        type: 'tinyint',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        unique: true,
        length: 128,
    })
    email: string;

    @Column('varchar', {
        nullable: false,
        length: 64,
    })
    password: string;

    @Column('varchar', {
        nullable: false,
        length: 128,
        name: 'password_salt',
    })
    passwordSalt: string;

    @Column('nvarchar', {
        nullable: false,
        length: 320,
        name: 'full_name',
    })
    fullName: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: false,
    })
    admin: boolean;

    @Column('text', {
        nullable: true,
    })
    avatar: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: false,
    })
    status: boolean;

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

    @OneToMany(
        type => Mail,
        mail => mail.user,
        { eager: true },
    )
    mails: Mail[];

    @OneToMany(
        type => Task,
        task => task.user,
        { eager: true },
    )
    tasks: Task[];
}
