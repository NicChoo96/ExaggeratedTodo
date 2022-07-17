import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm"
import { IsDate, IsInt, IsOptional, IsNotEmpty, IsString } from "class-validator"

@Entity()
export class TodoList extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    @IsString()
    @IsNotEmpty()
    todo_title: string

    @Column()
    @IsString()
    @IsNotEmpty()
    todo_desc: string

    @Column({
        nullable: true
    })
    @IsInt()
    @IsOptional()
    order_no: number

    @Column({
        nullable: true
    })
    @IsDate()
    @IsOptional()
    deadline: Date

    @CreateDateColumn()
    created_at: Date
}