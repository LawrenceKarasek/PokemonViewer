import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column({ name: 'base_experience' })
  baseExperience: number;

  @ManyToMany(() => Profile, (profile) => profile.savedPokemon)
  profiles: Profile[];
}
