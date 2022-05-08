import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('blogs')
export class Blogs {
    @PrimaryGeneratedColumn('uuid')
      id?: string

    @Column()
      title?: string

    @Column()
      content?: string
}
