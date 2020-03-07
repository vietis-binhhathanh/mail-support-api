import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Mail} from './mail.entity';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn({
        type: 'tinyint',
    })
    id: number;

    @Column('varchar', {
        name: 'customer_name',
        length: 64,
        nullable: false,
    })
    customerName: string;

    @Column('varchar', {
        name: 'project_code',
        length: 64,
        nullable: false,
        unique: true,
    })
    projectCode: string;

    @Column('varchar', {
        name: 'project_name',
        length: 320,
        nullable: false,
    })
    projectName: string;

    @Column('text', {
        name: 'project_description',
        nullable: false,
    })
    projectDescription: string;

    @Column('varchar', {
        name: 'mail_group',
        length: 320,
        nullable: false,
    })
    mailGroup: string;

    @Column('text', {
        name: 'avatar',
        nullable: true,
        default: null,
    })
    avatar: string;

    @Column('tinyint', {
        width: 1,
        name: 'dayly_mandatory',
        default: false,
    })
    daylyMandatory: boolean;

    @Column('tinyint', {
        width: 1,
        default: false,
    })
    notification: boolean;

    @Column('datetime', {
        name: 'start_date',
        nullable: false,
    })
    startDate: Date;

    @Column('datetime', {
        name: 'end_date',
        nullable: false,
    })
    endDate: Date;

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
        mail => mail.project,
        { eager: true },
    )
    mails: Mail[];
}
