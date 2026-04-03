import { promocodeCreateAttributesSchema, type PromoCodeCreateAttributes } from "@/lib/services/types/ticket.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  promoCodes: PromoCodeCreateAttributes[];
  // eslint-disable-next-line no-unused-vars
  onAdd: (data: PromoCodeCreateAttributes) => void;
};

export const PromoCodeSection = React.memo(({ promoCodes, onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PromoCodeCreateAttributes>({
    resolver: zodResolver(promocodeCreateAttributesSchema),
    defaultValues: {
      code: "",
      discount_percent: 0,
      total: 0,
    },
  });

  const handleAdd = (data: PromoCodeCreateAttributes) => {
    onAdd(data);
    console.log("SET NEW PROMOCODE");
    reset();
  };

  return (
    <fieldset>
      <legend>Promo codes</legend>
      <label>
        <span>Code</span>
        <input {...register("code")} placeholder="FROST20" />
        {errors.code && <small>{errors.code.message}</small>}
      </label>
      <label>
        <span>Discount (%)</span>
        <input {...register("discount_percent", { valueAsNumber: true })} placeholder="20" />
        {errors.discount_percent && <small>{errors.discount_percent.message}</small>}
      </label>
      <label>
        <span>Usage limit</span>
        <input {...register("total", { valueAsNumber: true })} placeholder="100" />
        {errors.total && <small>{errors.total.message}</small>}
      </label>
      <button type="button" className="primary-btn" onClick={handleSubmit(handleAdd)}>
        Add promo code
      </button>
      {promoCodes.length > 0 && (
        <ul>
          {promoCodes.map((p, i) => (
            <li key={i}>
              {p.code} - {p.discount_percent}% ({p.total})
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
});
