import {
  Prescription,
  CreatePrescriptionInput,
  EditPrescriptionInput,
  DeletePrescriptionInput,
  DeletePrescriptionResult,
} from "./types.js";
import {
  createPrescriptionResolver,
  editPrescriptionResolver,
  deletePrescriptionResolver,
} from "./resolvers.js";
import _ from "lodash";

const createPrescription = {
  type: Prescription,
  args: {
    prescription: { type: CreatePrescriptionInput },
  },
  resolve: createPrescriptionResolver,
};

const editPrescription = {
  type: Prescription,
  args: {
    prescription: { type: EditPrescriptionInput },
  },
  resolve: editPrescriptionResolver,
};

const deletePrescription = {
  type: DeletePrescriptionResult,
  args: { prescription: { type: DeletePrescriptionInput } },
  resolve: deletePrescriptionResolver,
};

const mutations = _.merge(
  { createPrescription },
  { editPrescription },
  { deletePrescription },
);

export const prescriptionMutations = {
  name: "Mutation",
  fields: mutations,
};
