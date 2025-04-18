import { Recipe } from '@/types/Recipes'
import { TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  name: keyof Recipe
  label: string
  multiline?: boolean
  control: ReturnType<typeof useForm<Recipe>>['control']
  errors: ReturnType<typeof useForm<Recipe>>['formState']['errors']
  showErrorMessage?: boolean
}

export const FormTextField = (props: Props) => {
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <TextField
            {...field}
            label={props.label}
            multiline={props.multiline}
            rows={props.multiline ? 5 : 1}
            error={!!props.errors[props.name]?.message}
          />
        )}
      />
      {props.showErrorMessage && props.errors[props.name]?.message && (
        <Typography role="alert" variant="subtitle2" color="error">
          {props.errors[props.name]?.message?.toString()}
        </Typography>
      )}
    </>
  )
}
