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
    public readonly reps: number
  ) {}
}
