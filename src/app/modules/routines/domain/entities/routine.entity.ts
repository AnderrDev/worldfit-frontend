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
    public readonly exerciseIds: string[]
  ) {}

  get totalExercises(): number {
    return this.exerciseIds.length;
  }
}
