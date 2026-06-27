/**
 * Entidad de dominio: Routine
 * Una rutina de entrenamiento del gimnasio.
 */
export class Routine {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly difficulty: 'beginner' | 'intermediate' | 'advanced',
    public readonly exerciseIds: string[],
    public readonly assignedUserId: number = 0,
    public readonly assignmentStatus: 'pending' | 'accepted' | 'rejected' = 'pending'
  ) {}

  get totalExercises(): number {
    return this.exerciseIds.length;
  }
}

export type RoutineFormData = {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exerciseIds: number[];
  assignedUserId: number;
  status: number;
};
