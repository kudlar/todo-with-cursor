import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp;
}

const COLLECTION_NAME = 'todos';

// Create a new todo
export async function addTodo(text: string): Promise<string> {
  const todoData = {
    text,
    completed: false,
    createdAt: Timestamp.now()
  };
  
  const docRef = await addDoc(collection(db, COLLECTION_NAME), todoData);
  return docRef.id;
}

// Get all todos
export async function getTodos(): Promise<Todo[]> {
  const todosQuery = query(collection(db, COLLECTION_NAME));
  const querySnapshot = await getDocs(todosQuery);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Todo));
}

// Toggle todo completion status
export async function toggleTodoComplete(id: string, completed: boolean): Promise<void> {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(todoRef, { completed });
}

// Update todo text
export async function updateTodoText(id: string, text: string): Promise<void> {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(todoRef, { text });
}

// Delete a todo
export async function deleteTodo(id: string): Promise<void> {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(todoRef);
} 