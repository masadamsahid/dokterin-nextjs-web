export type Category = {
  id: number;
  documentId: string;
  Name: string;
  Icon: { url: string };

};

export type CategoryShort = Omit<Category, "Icon">;

export type Doctor = {
  id: number;
  documentId: string;
  Name: string;
  Image: { url: string };
  Premium: boolean;
  Phone: string;
  Patients: string;
  StartTime: string;
  EndTime: string;
  Address: string;
  About: string;
  Year_of_Experience: string;
  categories: CategoryShort[] | Category[];
}