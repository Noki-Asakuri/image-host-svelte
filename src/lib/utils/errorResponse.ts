export const errorReponse = (status: number, message?: string | undefined) => {
    return new Response(JSON.stringify({ message }), {
        status,
        headers: {
            "Keep-Alive": "timeout=86400",
            Connection: "keep-alive",
            "Content-Type": "application/json",
        },
    });
};
