export interface BubbleLayout {
    id: string;
    x: number;
    y: number;
    size: number;
}

import { djb2, mulberry32 } from "../shared/hash";
import { ProjectData } from "./usePortfolio";

function overlapPercent(
    a: { x: number; y: number; size: number },
    b: { x: number; y: number; size: number },
): number {
    const ax1 = a.x;
    const ay1 = a.y;
    const ax2 = a.x + a.size;
    const ay2 = a.y + a.size;
    const bx1 = b.x;
    const by1 = b.y;
    const bx2 = b.x + b.size;
    const by2 = b.y + b.size;

    const ox = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
    const oy = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
    const area = ox * oy;
    const minArea = Math.min(a.size * a.size, b.size * b.size);

    return minArea > 0 ? area / minArea : 0;
}

export function useBubbleLayout(
    projects: ProjectData[],
    containerWidth: number,
    containerHeight: number,
): BubbleLayout[] {
    const padding = 40;
    const availableW = Math.max(100, containerWidth - padding * 2);
    const availableH = Math.max(100, containerHeight - padding * 2);

    const slots: Array<{ col: number; row: number }> = [];
    const cols = 5;
    const rows = Math.max(4, Math.ceil(projects.length / cols));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            slots.push({ col: c, row: r });
        }
    }

    const rng = mulberry32(djb2(projects[0]?.id ?? "default"));
    for (let i = slots.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    const cellW = availableW / cols;
    const cellH = availableH / rows;

    function computeSize(
        name: string,
        _description: string,
        id: string,
    ): number {
        const base = 130;
        const size = base + name.length * 7;

        const hash = djb2(id);
        const variance = 0.96 + (hash % 8) / 100;
        return Math.max(140, Math.min(220, Math.round(size * variance)));
    }

    const results: BubbleLayout[] = [];
    const placed: BubbleLayout[] = [];

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const size = computeSize(project.name, project.description, project.id);

        const slotX = padding + slots[i].col * cellW + cellW / 2 - size / 2;
        const slotY = padding + slots[i].row * cellH + cellH / 2 - size / 2;

        const jitterX = (djb2(`${project.id}-jx`) % 50) - 25;
        const jitterY = (djb2(`${project.id}-jy`) % 50) - 25;

        let x = Math.max(
            padding,
            Math.min(containerWidth - padding - size, slotX + jitterX),
        );
        let y = Math.max(
            padding,
            Math.min(containerHeight - padding - size, slotY + jitterY),
        );

        let attempts = 0;
        while (attempts < 50) {
            const hasCollision = placed.some(
                (p) =>
                    overlapPercent(
                        { x, y, size },
                        { x: p.x, y: p.y, size: p.size },
                    ) > 0.15,
            );

            if (!hasCollision) break;

            const nextIdx = (i + attempts + 1) % slots.length;
            const nextSlot = slots[nextIdx];
            const nsx = padding + nextSlot.col * cellW + cellW / 2 - size / 2;
            const nsy = padding + nextSlot.row * cellH + cellH / 2 - size / 2;
            const njx = (djb2(`${project.id}-jx-${attempts}`) % 50) - 25;
            const njy = (djb2(`${project.id}-jy-${attempts}`) % 50) - 25;
            x = Math.max(
                padding,
                Math.min(containerWidth - padding - size, nsx + njx),
            );
            y = Math.max(
                padding,
                Math.min(containerHeight - padding - size, nsy + njy),
            );
            attempts++;
        }

        const entry = { id: project.id, x, y, size };
        results.push(entry);
        placed.push(entry);
    }

    return results;
}
