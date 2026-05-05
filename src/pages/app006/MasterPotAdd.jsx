import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ToasterCustom } from "@/components/common/ToasterCustom";
import { addPot } from "../../utils/ListApi";

const MasterPotAdd = (props) => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    if (props.modalAddOpen) {
      formik.resetForm()
    }
  }, [props.modalAddOpen])

  const handleClose = () => {
    props.setModalAddOpen(false);
  }

  // Validation Form
  const formik = useFormik({
    initialValues:
    {
      potName: "",
    },
    validationSchema: Yup.object
      ({
        potName: Yup.string().required("Pot Name is required."),
      }),

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      setLoadingSpinner(true)
      await SavePotAction(values)
      setSubmitting(false)
    },
  });

  const SavePotAction = useCallback(async (param) => {
    try {
      await ToasterCustom.promise(addPot(param), {
        loading: "Creating pot...",
        success: "Pot added successfully.",
        error: (err) => err?.response?.data?.message || "System is unavailable, please try again later."
      })
      props.refreshTable();
      handleClose()
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingSpinner(false)
    }
  }, [])

  return (
    <Dialog
      open={props.modalAddOpen}
      onOpenChange={(open) => { if (!open) handleClose() }}
    >
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Pot</DialogTitle>
          <DialogDescription>Add a new pot to the system</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6"
        >
          <FieldGroup className="gap-2">
            <Field className="gap-2">
              <FieldLabel>Pot Name</FieldLabel>
              <InputGroup className="overflow-hidden">
                <InputGroupInput
                  id="potName"
                  name="potName"
                  type="text"
                  placeholder="Enter pot name"
                  value={formik.values.potName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={formik.touched.potName && !!formik.errors.potName}
                />
              </InputGroup>
              {formik.touched.potName && formik.errors.potName && (
                <FieldDescription className="text-xs text-destructive">{formik.errors.potName}</FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="flex-row gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1"
              disabled={loadingSpinner}
            >
              <Spinner
                data-icon="inline-start"
                className={loadingSpinner ? "flex" : 'hidden'}
              />
              {loadingSpinner ? "Saving..." : "Add Pot"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

MasterPotAdd.propTypes = {
  modalAddOpen: PropTypes.any,
  setModalAddOpen: PropTypes.any,
  refreshTable: PropTypes.any,
};

export default MasterPotAdd