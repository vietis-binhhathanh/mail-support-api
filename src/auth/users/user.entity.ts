import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @Column('varchar', {
    primary: true,
    nullable: false,
    length: 128,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'password',
  })
  password: string;

  @Column('varchar', {
    nullable: false,
    length: 240,
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
    name: 'admin',
  })
  admin: boolean;

  @Column('text', {
    nullable: true,
    name: 'avatar',
  })
  avatar: string | null;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    name: 'status',
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
  updatedDate: Date | null;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.passwordSalt);
    return hash === this.password;
  }
}
