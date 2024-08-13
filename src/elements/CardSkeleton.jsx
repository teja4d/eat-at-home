import React from 'react';

export default function CardSkeleton() {
  return (
    <div
      class="card"
      aria-hidden="true"
    >
      <p class="placeholder-glow">
        <span class="placeholder"></span>
        <img
            src={undefined}
            class="card-img-top placeholder"
            alt=""
            height={200}
            width={180}
            />
      </p>
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a
          class="btn btn-primary disabled placeholder col-6"
          aria-disabled="true"
        ></a>
      </div>
    </div>
  );
}
