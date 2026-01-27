


async function verifySignature(payload, signature) {
    const secret = "3QyBII93gREnKx1"; // Client token given while configurign webhook
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(payload));
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-512" },
        false,
        ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
    const computedSignature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
    console.log("Computed signature (base64):", computedSignature);
    return computedSignature === signature;
}

async function handleRequest(request) {
    const signature = request.headers["x-jbm-signature"];
    const payload = request.body;

    if (!(await verifySignature(payload, signature))) {
        return new Response("Invalid signature", { status: 401 });
    }

    return new Response("Request processed successfully", { status: 200 });
}

module.exports = { handleRequest };  