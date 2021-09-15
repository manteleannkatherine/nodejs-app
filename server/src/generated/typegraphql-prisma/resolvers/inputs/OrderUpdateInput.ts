import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { OrderDetailUpdateManyWithoutOrderInput } from "../inputs/OrderDetailUpdateManyWithoutOrderInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";
import { UserUpdateOneWithoutOrdersInput } from "../inputs/UserUpdateOneWithoutOrdersInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class OrderUpdateInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  id?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateOneWithoutOrdersInput, {
    nullable: true
  })
  customer?: UserUpdateOneWithoutOrdersInput | undefined;

  @TypeGraphQL.Field(_type => OrderDetailUpdateManyWithoutOrderInput, {
    nullable: true
  })
  orderDetails?: OrderDetailUpdateManyWithoutOrderInput | undefined;
}
