import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { useFormik } from "formik";
import * as Yup from "yup";
import { editPot } from "../../utils/ListApi";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToasterCustom } from "@/components/common/ToasterCustom";

const MasterPotEdit = (props) => {
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    useEffect(() => {
        if (props.modalEditOpen) {
            formik.resetForm({
                values: {
                    potId: props.app003PotEditData.potId,
                    potName: props.app003PotEditData.potName,
                }
            })
        }
    }, [props.modalEditOpen])

    const handleClose = () => {
        props.setModalEditOpen(false);
    }

    // Validation Form
    const formik = useFormik({
        initialValues:
        {
            potId: "",
            potName: "",
        },
        validationSchema: Yup.object
            ({
                potId: Yup.string().required("Pot Id is required."),
                potName: Yup.string().required("Pot Name is required."),
            }),

        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            setLoadingSpinner(true)
            await EditPotAction(values)
            setSubmitting(false)
        },
    });

    const EditPotAction = useCallback(async (param) => {
        try {
            await ToasterCustom.promise(editPot(param.potId, {
                potName: param.potName,
            }),
                {
                    loading: "Saving changes...",
                    success: "Pot updated successfully.",
                    error: (err) => err?.response?.data?.message || "System is unavailable, please try again later."
                }
            )
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
            open={props.modalEditOpen}
            onOpenChange={(open) => { if (!open) handleClose() }}
        >
            <DialogContent
                className="sm:max-w-md"
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Edit Pot</DialogTitle>
                    <DialogDescription>Update the pot information below
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-6"
                >
                    <FieldGroup className="gap-2">
                        <Field className="gap-2">
                            <FieldLabel>Pot Id</FieldLabel>
                            <InputGroup className="overflow-hidden">
                                <InputGroupInput
                                    id="potId"
                                    name="potId"
                                    type="text"
                                    value={formik.values.potId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    aria-invalid={formik.touched.potId && !!formik.errors.potId}
                                    disabled
                                />
                            </InputGroup>
                            {formik.touched.potId && formik.errors.potId && (
                                <FieldDescription className="text-xs text-destructive">{formik.errors.potId}</FieldDescription>
                            )}
                        </Field>

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
                            {loadingSpinner ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

MasterPotEdit.propTypes = {
    modalEditOpen: PropTypes.any,
    setModalEditOpen: PropTypes.any,
    refreshTable: PropTypes.any,
    app003PotEditData: PropTypes.any,
};

export default MasterPotEdit