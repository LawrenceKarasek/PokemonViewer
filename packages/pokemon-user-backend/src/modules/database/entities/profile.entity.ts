import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Pokemon, { cascade: true })
  @JoinTable({
    name: 'profile_pokemon', 
    joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'pokemon_id', referencedColumnName: 'id' },
  })
  savedPokemon: Pokemon[];
}
