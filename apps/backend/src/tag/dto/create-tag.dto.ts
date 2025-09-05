import { OmitType } from "@nestjs/swagger";

import { Tag } from "../entities/tag.entity";

export class CreateTagDto extends OmitType(Tag, ['id']) {}
