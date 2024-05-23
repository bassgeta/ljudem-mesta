<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="comparison-tables">
	<div class="comparison-table-outer comparison-table-outer-airbnb">
		<div class="comparison-table-inner">
			<h4 class="comparison-table-title">
				{$_('comparisonTable.airbnb.title')}
			</h4>
			<div class="comparison-table-income-title">
				<span>{$_('comparisonTable.income')}</span>
				<span>18.000 EUR</span>
			</div>
			<div class="comparison-table-container comparison-table-airbnb">
				<div class="comparison-table-expenses">
					<div class="comparison-table-expense-row">
						<span>
							Airbnb strošek (2.700 EUR) + DDV (3.366 EUR) + obratovalni stroški (1.200 EUR) + 4 %
							davek s.p. (477 EUR) = 7.743 EUR
						</span>
					</div>
				</div>
				<div class="comparison-table-income">
					<div class="comparison-table-income-text">
						<span>
							{$_('comparisonTable.profit')}
						</span>
						<span>11.458 EUR</span>
					</div>
				</div>
			</div>
			<p class="comparison-table-explanation">
				{$_('comparisonTable.airbnb.description')}
			</p>
		</div>
	</div>

	<div class="comparison-table-outer comparison-table-outer-rent">
		<div class="comparison-table-inner">
			<h4 class="comparison-table-title">
				{$_('comparisonTable.rent.title')}
			</h4>
			<div class="comparison-table-income-title">
				<span>{$_('comparisonTable.income')}</span>
				<span>6.000 EUR</span>
			</div>
			<div class="comparison-table-container comparison-table-rent">
				<div class="comparison-table-expenses">
					<div class="comparison-table-expense-row small">
						<span>
							{$_('comparisonTable.rent.expense1')}
						</span>
						<span>1.350 EUR</span>
					</div>
				</div>
				<div class="comparison-table-income">
					<div class="comparison-table-income-text">
						<span>
							{$_('comparisonTable.profit')}
						</span>
						<span>4.050 EUR</span>
					</div>
				</div>
			</div>
			<p class="comparison-table-explanation shorter-explanation">
				{$_('comparisonTable.rent.description')}
			</p>
		</div>
	</div>
</div>

<style>
	.comparison-tables {
		width: 100%;
		display: flex;
		gap: 2.625rem;
		justify-content: space-evenly;
		flex-wrap: wrap;
		@media screen and (max-width: 767px) {
			flex-direction: column;
		}
	}

	.comparison-table-outer {
		flex: 1;
		/* height: 50rem; */
		/* max-width: 580px; */

		border-radius: 25px;
		padding: 1rem;
		color: var(--text-secondary);
	}

	.comparison-table-outer-airbnb {
		background-color: var(--color-light-green);
	}

	.comparison-table-outer-rent {
		background-color: var(--color-pink);
	}

	.comparison-table-inner {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 0 1rem;
		border-radius: 11px;
		border: 2px solid var(--text-secondary);
	}

	.comparison-table-title {
		margin-top: 2rem;
		text-align: center;
		margin-bottom: 1.57rem;

		font-size: 1.5rem;
		font-weight: 900;
		line-height: 1.8rem;
	}

	.comparison-table-income-title {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;

		margin-top: auto;
		margin-bottom: 0.5rem;
		padding: 0 1rem;

		font-size: 1.3125rem;
		line-height: 1.75;
		font-weight: 700;
	}

	.comparison-table-container {
		width: 100%;
		display: flex;
		flex-direction: column;

		border-radius: 11px;
		border: 2px solid var(--text-secondary);
		overflow: hidden;
	}

	.comparison-table-expenses {
		background-color: var(--color-pinker);
		padding: 0 0.5rem;
		border-bottom: 2px solid var(--text-secondary);
	}

	.comparison-table-expense-row {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 2.4375rem 2.1875rem 1.1875rem 1.1875rem;
		font-size: 1.125rem;
		line-height: 1.625rem;
		height: 10.125rem;

		&.small {
			padding: 0.125rem 2.1875rem 0 1.1875rem;
			height: 2.125rem;
		}
	}

	.comparison-table-expense-row:not(:last-child) {
		border-bottom: 1px solid var(--text-secondary);
	}

	.comparison-table-income {
		display: flex;
		flex: 1;
		background-color: var(--color-green);
	}

	.comparison-table-income-text {
		width: 100%;
		margin: auto 1.25rem 0.8125rem 1.25rem;

		display: flex;
		align-items: center;
		justify-content: space-between;

		font-weight: 700;
		font-size: 1.3125rem;
		line-height: 1.75;
	}

	.comparison-table-explanation {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		text-align: start;
		color: var(--text-secondary);
		text-wrap: balance;

		font-size: 1rem;
		line-height: 1.2rem;
		max-width: 29.6875rem;
		min-height: 6rem;
	}

	.shorter-explanation {
		/* margin-bottom: 2.6875rem; */
	}

	.comparison-table-airbnb {
		height: 28.125rem;
	}

	.comparison-table-rent {
		height: 9.375rem;
	}
</style>
