import Minecraft from "../client/Minecraft";
import Difficulty from "../client/settings/Difficulty";
import * as THREE from 'three'
import { PerspectiveCamera, Renderer, Scene } from "three";

export default class World {
  private readonly minecraft: Minecraft  = Minecraft.getInstance();
  private readonly levelData: ClientWorldInfo;

  private scene: Scene;
  private renderer: Renderer;
  private camera: PerspectiveCamera;

  public constructor(levelData: ClientWorldInfo) {
    this.levelData = levelData;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  _s() {
    document.body.appendChild( this.renderer.domElement );
  }
}
export class ClientWorldInfo {
  private readonly hardcore: boolean;
  private readonly isFlat: boolean;
  private xSpawn: number = 0;
  private ySpawn: number = 0;
  private zSpawn: number = 0;
  private spawnAngle: number = 90;
  private difficulty: Difficulty;
  private difficultyLocked: boolean = false;

  public constructor(difficulty: Difficulty, hardcore: boolean, isFlat: boolean) {
    this.difficulty = difficulty;
    this.hardcore = hardcore;
    this.isFlat = isFlat;
  }

  public setXSpawn(value: number): void {
    this.xSpawn = value;
  }

  public setYSpawn(value: number): void {
    this.ySpawn = value;
  }

  public setZSpawn(value: number): void {
    this.zSpawn = value;
  }

  public setSpawn(x: number, y: number, z: number, angle: number) {
    this.xSpawn = x;
    this.ySpawn = y;
    this.zSpawn = z;
    this.spawnAngle = angle;
  }

  public setSpawnAngle(value: number): void {
    this.spawnAngle = value;
  }

  public setDifficulty(difficulty: Difficulty): void {
    this.difficulty = difficulty;
  }

  public setDifficultyLocked(locked: boolean): void {
    this.difficultyLocked = locked;
  }

  public getXSpawn(): number {
    return this.xSpawn;
  }

  public getYSpawn(): number {
    return this.ySpawn;
  }

  public getZSpawn(): number {
    return this.zSpawn;
  }

  public getSpawnAngle(): number {
    return this.spawnAngle;
  }

  public isHardcore(): boolean {
    return this.hardcore;
  }

  public getDifficulty(): Difficulty {
    return this.difficulty;
  }

  public isDifficultyLocked(): boolean {
    return this.difficultyLocked;
  }
}