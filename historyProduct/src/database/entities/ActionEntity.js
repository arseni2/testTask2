import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export @Entity("action") class ActionEntity {
    @PrimaryGeneratedColumn()
    id;

    @Column({type: "varchar"})
    action; //make enum instead of str

    @Column({type: "int"})
    shopId;

    @Column({type: "int"})
    productId;

    @CreateDateColumn({type: "timestamp"})
    createdAt;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt;
}