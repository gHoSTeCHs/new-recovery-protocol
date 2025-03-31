import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RecoveryMessageTypeProps {
    initialMessageType?: string;
}

const RecoveryMessageType = ({ initialMessageType = 'error' }: RecoveryMessageTypeProps) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, wasSuccessful } = useForm({
        message_type: initialMessageType,
    });

    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccess(true);

            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [wasSuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings/recovery-message');
    };

    const messageTypes = [
        {
            id: 'error',
            title: 'Error',
            description: 'Standard recovery error message'
        },
        {
            id: 'success',
            title: 'Success',
            description: 'More casual and encouraging recovery message'
        },

    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Recovery Message Settings</CardTitle>
                <CardDescription>
                    Choose how recovery messages will be displayed
                </CardDescription>
            </CardHeader>

            {showSuccess && (
                <Alert className="mx-6 bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                        Recovery message settings updated successfully!
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <CardContent>
                    <RadioGroup
                        value={data.message_type}
                        onValueChange={(value) => setData('message_type', value)}
                        className="space-y-4 mb-4"
                    >
                        {messageTypes.map((type) => (
                            <div key={type.id} className="flex items-start space-x-3 p-3 rounded border hover:bg-black/50">
                                <RadioGroupItem id={type.id} value={type.id} />
                                <div className="space-y-1">
                                    <Label htmlFor={type.id} className="font-medium">
                                        {type.title}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        {type.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>

                <CardFooter className="border-t px-6 py-4">
                    <div className="ml-auto">
                        <Button
                            type="submit"
                            disabled={processing || data.message_type === initialMessageType}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
};

export default RecoveryMessageType;
