import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  userName: string;

  @Column()
  email: string;
}

export default User;
