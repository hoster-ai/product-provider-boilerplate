import { ApiProperty } from "@nestjs/swagger";
import { IntervalEnum } from "src/enums/interval.enum";

export class UnitDto {
  @ApiProperty({
    type: String,
    title: "Id of the Unit",
    example: "traffic",
    description: "This is the name of the unit to be charged per interval",
  })
  id: string;
  @ApiProperty({
    type: String,
    title: "Value of the unit",
    example: "GB",
    description: "This is the actual value that the Unit is measured with",
  })
  unit: string;
  @ApiProperty({
    type: Number,
    title: "Unit Interval",
    example: "3600",
    description:
      "This is the Interval of time for the unit to be measured.",
  })
  interval: IntervalEnum;
}
