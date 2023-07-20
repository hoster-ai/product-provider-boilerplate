import { ApiResponseProperty } from "@nestjs/swagger";

export class ChargeResponseDto {
  @ApiResponseProperty({
    example: 1646823311,
  })
  timestamp: number;

  @ApiResponseProperty({
    example: { cpu: 1, ram: 2 },
  })
  variants: Record<string, string|number>;
}
