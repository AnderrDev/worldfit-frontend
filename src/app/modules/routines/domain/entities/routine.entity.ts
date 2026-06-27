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
    public readonly durationMinutes: number = 0,
    public readonly assignedUserId: number = 0,
    public readonly assignmentStatus: 'pending' | 'accepted' | 'rejected' = 'pending'
  ) {}

  get totalExercises(): number {
    return this.exerciseIds.length;
  }
}

export type RoutineExercisePayload = {
  exerciseId: number;
  sets: number;
  repetitions: number;
  exerciseOrder: number;
  notes: string;
};

export type RoutineFormData = {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: RoutineExercisePayload[];
  assignedUserId: number;
};
