import { onMounted, onUnmounted, ref } from "vue";

export function useLiveTime() {
    const hours = ref("00");
    const minutes = ref("00");
    const seconds = ref("00");

    let interval: ReturnType<typeof setInterval> | null = null;

    function update() {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Europe/Skopje",
            hour12: false,
        });
        const parts = formatter.formatToParts(now);
        for (const p of parts) {
            if (p.type === "hour") hours.value = p.value;
            if (p.type === "minute") minutes.value = p.value;
            if (p.type === "second") seconds.value = p.value;
        }
    }

    onMounted(() => {
        update();
        interval = setInterval(update, 1000);
    });

    onUnmounted(() => {
        if (interval !== null) clearInterval(interval);
    });

    return { hours, minutes, seconds };
}
