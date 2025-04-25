import { Recipe } from '@/types/Recipes'
import { styled, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

const CustomTextField = styled(TextField)({
  background: '#fff',

  '> .MuiInputBase-readOnly': {
    background: '#f3f3f3',
  },
})

type Props = {
  name: keyof Recipe
  label: string
  multiline?: boolean
  control: ReturnType<typeof useForm<Recipe>>['control']
  errors: ReturnType<typeof useForm<Recipe>>['formState']['errors']
  showErrorMessage?: boolean
  readonly?: boolean
}

export const FormTextField = (props: Props) => {
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            label={props.label}
            multiline={props.multiline}
            rows={props.multiline ? 5 : 1}
            error={!!props.errors[props.name]?.message}
            slotProps={{
              input: {
                readOnly: props.readonly,
              },
              inputLabel: {
                shrink: !!field.value,
              },
            }}
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
