export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'fullbody';

export class Exercise {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly muscleGroup: MuscleGroup,
    public readonly sets: number,
    public readonly reps: number,
    public readonly description: string = '',
    public readonly categoryId: number = 0
  ) {}
}

export type ExerciseFormData = {
  name: string;
  description: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: number;
  categoryId: number;
};
