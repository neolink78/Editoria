import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { CreateOrUpdateCodeSnippetArgs } from './codeSnippet.args';
import User from '../user/user';
import Project from '../project/project';

export enum Language {
  JAVASCRIPT = 'JAVASCRIPT',
  TYPESCRIPT = 'TYPESCRIPT',
  PYTHON = 'PYTHON',
  JAVA = 'JAVA',
  C = 'C',
  CPP = 'C++',
  CSHARP = 'C#',
}

registerEnumType(Language, {
  name: "Language",
});

type CodeSnippetArgs = CreateOrUpdateCodeSnippetArgs & {
  owner: User;
  projectId: string;
};

@Entity()
@ObjectType()
 class CodeSnippet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
    id!: string

  @Column()
  @Field()
  title!: string

  @Column({ default: "" })
  @Field()
  code!: string

  @CreateDateColumn()
  @Field()
  createdAt!: Date;
  
  @CreateDateColumn()
  @Field()
  updatedAt!: Date;
  
  @Column({default: Language.JAVASCRIPT})
  @Field(type => Language)
  language!: Language;

  @ManyToOne(() => Project, (project) => project.codeSnippetsOwned, { eager: true })
  @Field()
  project!: Project;

  constructor(codeSnippet?: CodeSnippetArgs) {
    super();

    if (codeSnippet) {
      this.title = codeSnippet.title;
      this.code = codeSnippet.code;
      this.language = codeSnippet.language;
    }
  }

  static async createCodeSnippet(codeSnippet: CodeSnippetArgs): Promise<CodeSnippet> {
    const newCodeSnippet = new CodeSnippet(codeSnippet);
    if (newCodeSnippet.code.length === 0 ) {
      throw new Error('Code snippet cannot be empty');
    }
      
    if (codeSnippet.projectId) {
      newCodeSnippet.project = await Project.getProjectById(codeSnippet.projectId);
    }

    return await CodeSnippet.save(newCodeSnippet);
  }

  static async getCodeSnippet(): Promise<CodeSnippet[]> {
    return await CodeSnippet.find();
  }

  static async getCodeSnippetById(id: string): Promise<CodeSnippet> {
    const codeSnippet = await CodeSnippet.findOne({ where: { id } });
    if (!codeSnippet) {
      throw new Error('Code snippet not found');
    }
    return codeSnippet;
  }

  static async deleteCodeSnippet(id: string): Promise<CodeSnippet> {
    const codeSnippet = await CodeSnippet.getCodeSnippetById(id);
    await CodeSnippet.delete(id);
    return codeSnippet;
  }
  
  static async updateCodeSnippet(id: string, partialCodeSnippet: CreateOrUpdateCodeSnippetArgs): Promise<CodeSnippet> {
    const codeSnippet = await CodeSnippet.getCodeSnippetById(id);
    Object.assign(codeSnippet, partialCodeSnippet, { updatedAt: new Date() });
    
    await codeSnippet.save();
    codeSnippet.reload()
    return codeSnippet;
  }
}

export default CodeSnippet;
