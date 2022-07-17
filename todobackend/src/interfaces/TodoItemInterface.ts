type Nullable<T> = T | null

export interface TodoItemProp {
    todo_title:string,
    todo_desc: string,
    order_no: Nullable<number>,
    deadline: Nullable<Date>
}