export interface Transaction {
  id: number;
  type: string;
  amount: number;
  note: string;
  date: string;
  category_id: number;
}
