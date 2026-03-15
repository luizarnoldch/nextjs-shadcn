import { ReactFormExtendedApi } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'

type Props = {
  form: ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>
  formName: string
  isPending?: boolean
  buttonClassName?: string
  buttonProps?: React.ComponentProps<typeof Button>
}

const FormSubmit = ({ form, formName, isPending, buttonClassName, buttonProps }: Props) => {
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty, state.isSubmitted]}
      children={([canSubmit, isSubmitting, isDirty, isSubmitted]) => (
        <Button
          type="submit"
          form={formName}
          disabled={!canSubmit || isPending || isSubmitting || !isDirty || isSubmitted}
          className={buttonClassName}
          {...buttonProps}
        >
          {isPending || isSubmitting ? "Guardando..." : isSubmitted ? "Guardado" : "Guardar Cambios"}
        </Button>
      )}
    />
  )
}

export default FormSubmit