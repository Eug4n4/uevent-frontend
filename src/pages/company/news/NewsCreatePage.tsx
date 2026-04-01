import { NewsService } from "@/lib/services/NewsService";
import { newsAttributesSchema, type NewsAttributes } from "@/lib/services/types/news.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type FeedbackState =
  | { status: "idle"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export const NewsCreatePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<NewsAttributes>({ resolver: zodResolver(newsAttributesSchema), mode: "all" });
  const params = useParams();
  const [feedback, setFeedback] = useState<FeedbackState>();
  const onSubmit = async (data: NewsAttributes) => {
    try {
      await NewsService.create(data, params.id as string);
      setFeedback({ status: "success", message: "Successfully created news!" });
    } catch (e) {
      setFeedback({ status: "error", message: `Error while creating news ${e}` });
    }
    reset();
  };

  return (
    <main className="create-layout">
      <section className="story-panel">
        <p className="eyebrow">Create news</p>
        <h2>It is the place where news is created!</h2>
      </section>

      <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
        {feedback ? <p className={`feedback ${feedback.status}`}>{feedback.message}</p> : null}
        <fieldset>
          <legend>Details</legend>
          <label className="create-form-label">
            <span>Title:</span>
            <input type="text" placeholder="Title..." {...register("name")} />
            {errors.name && <small>{errors.name.message}</small>}
          </label>
          <label className="create-form-label">
            <span>Description:</span>
            <textarea {...register("text")} rows={4} placeholder="Add a description" style={{ resize: "vertical" }} />
            {errors.text && <small>{errors.text.message}</small>}
          </label>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="primary-btn" disabled={!isValid || isSubmitting}>
            Create news
          </button>
        </div>
      </form>
    </main>
  );
};
