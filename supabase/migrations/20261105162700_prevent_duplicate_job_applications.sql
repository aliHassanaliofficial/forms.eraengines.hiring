CREATE OR REPLACE FUNCTION public.prevent_duplicate_job_applications()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.email := lower(btrim(NEW.email));

  PERFORM pg_advisory_xact_lock(hashtextextended(NEW.email, 0));

  IF EXISTS (
    SELECT 1
    FROM public.job_applications
    WHERE lower(btrim(email)) = NEW.email
      AND id IS DISTINCT FROM NEW.id
  ) THEN
    RAISE EXCEPTION 'You have already applied for this application'
      USING ERRCODE = '23505',
            CONSTRAINT = 'job_applications_email_unique';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER prevent_duplicate_job_applications
BEFORE INSERT OR UPDATE OF email ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.prevent_duplicate_job_applications();
