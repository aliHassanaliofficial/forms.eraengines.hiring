import { Card, CardContent } from "@/components/ui/card";
import { getFormConfig } from "@/config/forms";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlreadyApplied = () => {
  const { formId } = useParams<{ formId: string }>();
  const formConfig = formId ? getFormConfig(formId) : undefined;
  const companyName = formConfig?.companyName ?? "the company";

  useEffect(() => {
    document.title = `Already Applied - ${companyName}`;
  }, [companyName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You have already applied</h1>
          <p className="text-gray-600">
            We have already received your application. You can only apply once using this form.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlreadyApplied;
