import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";

export const Medication = new GraphQLObjectType({
  name: "Medication",
  fields: {
    name: { type: GraphQLString },
    dosage: { type: GraphQLString },
    frequency: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
});

export const MedicationInput = new GraphQLInputObjectType({
  name: "MedicationInput",
  fields: {
    name: { type: GraphQLString },
    dosage: { type: GraphQLString },
    frequency: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
});

export const Prescription = new GraphQLObjectType({
  name: "Prescription",
  fields: {
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    doctorId: { type: GraphQLString },
    medications: { type: new GraphQLList(Medication) },
    issueDate: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
    status: { type: GraphQLString },
    vendorId: { type: GraphQLString },
  },
});

export const CreatePrescriptionInput = new GraphQLInputObjectType({
  name: "CreatePrescriptionInput",
  fields: {
    userId: { type: GraphQLString },
    medications: { type: new GraphQLList(MedicationInput) },
    issueDate: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
    status: { type: GraphQLString },
    vendorId: { type: GraphQLString },
    doctorId: { type: GraphQLString },
  },
});

export const EditPrescriptionInput = new GraphQLInputObjectType({
  name: "EditPrescriptionInput",
  fields: {
    id: { type: GraphQLString },
    medications: { type: new GraphQLList(MedicationInput) },
    issueDate: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
    status: { type: GraphQLString },
    vendorId: { type: GraphQLString },
  },
});

export const DeletePrescriptionInput = new GraphQLInputObjectType({
  name: "DeletePrescriptionInput",
  fields: {
    id: { type: GraphQLString },
  },
});

export const DeletePrescriptionResult = new GraphQLObjectType({
  name: "DeletePrescriptionResult",
  fields: {
    success: { type: GraphQLString },
  },
});
