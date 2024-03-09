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
							{$_('comparisonTable.airbnb.expense1')}
						</span>
						<span>2.000 EUR</span>
					</div>
					<div class="comparison-table-expense-row">
						<span>
							{$_('comparisonTable.airbnb.expense2')}
						</span>
						<span>3.366 EUR</span>
					</div>
					<div class="comparison-table-expense-row">
						<span>
							{$_('comparisonTable.airbnb.expense3')}
						</span>
						<span>1.200 EUR</span>
					</div>
					<div class="comparison-table-expense-row">
						<span>
							{$_('comparisonTable.airbnb.expense4')}
						</span>
						<span>477 EUR</span>
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
					<div class="comparison-table-expense-row">
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
		gap: 2rem;
		justify-content: space-evenly;
		flex-wrap: wrap;

		padding: 0 1.5rem;
	}

	.comparison-table-outer {
		height: 50rem;
		max-width: 580px;

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
		font-size: var(--font-l);
		line-height: var(--lh-l);
		margin-top: 2rem;
		font-weight: 900;
		text-align: center;
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

		font-size: var(--font-l);
		line-height: var(--lh-l);
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
		background-color: var(--color-red);
		padding: 0 0.5rem;
		border-bottom: 2px solid var(--text-secondary);
	}

	.comparison-table-expense-row {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 0.5rem 0.5rem;
		font-size: var(--font-s);
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
		margin: auto 1rem 1rem 1rem;

		display: flex;
		align-items: center;
		justify-content: space-between;

		font-size: var(--font-l);
		font-weight: 700;
	}

	.comparison-table-explanation {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		text-align: start;
		font-size: var(--font-s);
		color: var(--text-secondary);
	}

	.shorter-explanation {
		margin-bottom: 2.5rem;
	}

	.comparison-table-airbnb {
		height: 29.25rem;
	}

	.comparison-table-rent {
		height: 11rem;
	}
</style>
