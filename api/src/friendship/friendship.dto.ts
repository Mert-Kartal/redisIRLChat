import { IsNotEmpty, IsUUID } from 'class-validator';

export class FriendshipDto {
  @IsUUID()
  @IsNotEmpty()
  requesterId: string;

  @IsUUID()
  @IsNotEmpty()
  receiverId: string;
}
