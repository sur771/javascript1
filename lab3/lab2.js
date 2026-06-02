'use strict';

/**
 * Возвращает n-е число Фибоначчи
 * @param {number} n - Порядковый номер числа Фибоначчи
 * @returns {bigint} n-е число Фибоначчи в формате BigInt
 */
export function fib(n) {
    if (n < 0) return 0n;
    if (n === 0) return 0n;
    if (n === 1) return 1n;
    
    let prev = 0n;
    let curr = 1n;
    
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}
