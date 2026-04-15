export type AppointmentStatus = 'scheduled' | 'confirmed' | 'arrived' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
export type PatientStatus = 'active' | 'inactive' | 'lead';
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'pending' | 'paid' | 'cancelled';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: Date;
  history: string;
  score: number;
  status: PatientStatus;
  createdAt: Date;
  lastVisit?: Date;
  photoUrl?: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  color: string;
  active: boolean;
}

export interface Procedure {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  category: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  roomId: string;
  start: Date;
  end: Date;
  status: AppointmentStatus;
  procedureId: string;
  notes: string;
  noShowProbability?: number;
}

export interface FinancialTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  patientId?: string;
  appointmentId?: string;
  date: Date;
  status: TransactionStatus;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
  unit: string;
}
